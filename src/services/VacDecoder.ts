import * as t from 'io-ts';
import * as E from 'fp-ts/lib/Either';
import {decodeBase45} from './base45';
import zlib from 'pako';
import 'cbor-rn-prereqs';
import cbor from 'cbor';

// https://ec.europa.eu/health/sitedefault/files/ehealth/docs/covid-certificate_json_specification_en.pdf

const VacPassName = t.strict({
  fn: t.string,
  fnt: t.string,
  gn: t.string,
  gnt: t.string,
});

const CertificateBasicInformation = t.strict({
  tg: t.string, // Disease or agent targeted
  co: t.string, // Member State or third country in which the vaccine was administered
  is: t.string, // Certificate issuer
  ci: t.string, // Unique certificate identifier
});

const BasicData = t.strict({
  ver: t.string,
  nam: VacPassName,
  dob: t.string,
});

const CertificateV = t.intersection([
  CertificateBasicInformation,
  t.strict({
    vp: t.string, // COVID-19 vaccine or prophylaxis
    mp: t.string, // COVID-19 vaccine product
    dn: t.number, // Number in a series of doses
    sd: t.number, // The overall number of doses in the series
    dt: t.union([t.string, t.object]), // Date of vaccination
  }),
]);

const CertificateT = t.intersection([
  CertificateBasicInformation,
  t.strict({
    tt: t.string, // The type of test
    sc: t.union([t.string, t.object]), // Date and time of the test sample collection
    tr: t.string, // Result of the test
    tc: t.string, // Testing centre or facility
  }),
  t.partial({
    nm: t.string, // Test name
    ma: t.string, // Test device identifier
    dr: t.union([t.string, t.object]), // ResultDate, Dropped in 1.2.0
  }),
]);

const CertificateR = t.intersection([
  CertificateBasicInformation,
  t.strict({
    fr: t.union([t.string, t.object]), // Date of the holders first positive NAAT test result
    df: t.union([t.string, t.object]), // Certificate valid from
    du: t.string, // Certificate valid until
  }),
]);

const VacPassCodecV = t.intersection([
  BasicData,
  t.strict({
    v: t.array(CertificateV),
  }),
]);

const VacPassCodecT = t.intersection([
  BasicData,
  t.strict({
    t: t.array(CertificateT),
  }),
]);
const VacPassCodecR = t.intersection([
  BasicData,
  t.strict({
    r: t.array(CertificateR),
  }),
]);

const VacCertData = t.union([CertificateV, CertificateR, CertificateT]);
const VacPassAll = t.union([VacPassCodecV, VacPassCodecR, VacPassCodecT]);

export type VacPass = t.TypeOf<typeof VacPassAll>;
export type VacCertData = t.TypeOf<typeof VacCertData>;
export type VacPassName = t.TypeOf<typeof VacPassName>;

const decodeVacPass = (data: string): E.Either<t.Errors, VacPass> => {
  const removedBeginning = data.replace('HC1:', '');
  let result = decodeBase45(removedBeginning);
  const next = result[0] === 0x78 ? zlib.inflate(result) : result.buffer;
  const decoded = cbor.decode(next);
  const payload = cbor.decode(decoded.value[2]);
  const cert = payload.get(-260).get(1);
  return VacPassAll.decode(cert);
};

export type VacData = {
  type: 'vaccine';
  date: string;
  numberOfDose: number;
  seriesDoses: number;
  product: string;
  issuer: string;
  nam: VacPassName;
};

export type RecData = {
  type: 'recovery';
  disease: string;
  dateFrom: string;
  dateUntil: string;
  issuer: string;
  nam: VacPassName;
};

export type TestData = {
  type: 'test';
  date: string;
  result: 'Detected' | 'Not detected';
  issuer: string;
  facility: string;
  nam: VacPassName;
};

const mapCertData = (
  data: VacPass,
): VacData | RecData | TestData | {type: 'nothing'} => {
  if ('v' in data) {
    return {
      nam: data.nam,
      type: 'vaccine',
      date: data.v[0].dt.toString(),
      numberOfDose: data.v[0].dn,
      seriesDoses: data.v[0].sd,
      product: data.v[0].mp,
      issuer: data.v[0].is,
    };
  }
  if ('r' in data) {
    const disease = data.r[0].tg === '840539006' ? 'COVID-19' : data.r[0].tg;
    return {
      nam: data.nam,
      disease,
      type: 'recovery',
      dateFrom: data.r[0].df.toString(),
      dateUntil: data.r[0].du,
      issuer: data.r[0].is,
    };
  }
  if ('t' in data) {
    const result = data.t[0].tr === '260415000' ? 'Detected' : 'Not detected';
    return {
      nam: data.nam,
      type: 'test',
      date: data.t[0].sc.toString(),
      result,
      facility: data.t[0].tc,
      issuer: data.t[0].is,
    };
  }
  return {type: 'nothing'};
};

export const decodeService = {decodeVacPass, mapCertData};

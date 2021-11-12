import * as t from 'io-ts';
import {Either} from 'fp-ts/lib/Either';
import * as E from 'fp-ts/lib/Either';
import {decodeBase45} from './base45';
import zlib from 'pako';
import 'cbor-rn-prereqs'; // makes no difference if required or imported
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
    dt: t.string, // Date of vaccination
  }),
]);

const CertificateT = t.intersection([
  CertificateBasicInformation,
  t.strict({
    tt: t.string, // The type of test
    sc: t.string, // Date and time of the test sample collection
    tr: t.string, // Result of the test
    tc: t.string, // Testing centre or facility
  }),
  t.partial({
    nm: t.string, // Test name
    ma: t.string, // Test device identifier
  }),
]);

const CertificateR = t.intersection([
  CertificateBasicInformation,
  t.strict({
    fr: t.string, // Date of the holders first positive NAAT test result
    df: t.string, // Certificate valid from
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

const decodeVacPass = (data: string): Either<string, VacPass> => {
  const removedBeginning = data.replace('HC1:', '');
  let result = decodeBase45(removedBeginning);
  if (result[0] === 0x78) {
    const afterPako = zlib.inflate(result);
    const decoded = cbor.decode(afterPako.buffer);
    const payload = cbor.decode(decoded.value[2]);
    const cert = payload.get(-260).get(1);
    const resultDecoded = E.isRight(VacPassAll.decode(cert))
      ? E.right(cert)
      : E.left('Error decoding VacPass');
    return resultDecoded;
  }
  const decoded = cbor.decode(result.buffer);
  const payload = cbor.decode(decoded.value[2]);
  const cert = payload.get(-260).get(1);
  const resultDecoded = E.isRight(VacPassAll.decode(cert))
    ? E.right(cert)
    : E.left('Error decoding VacPass');
  return resultDecoded;
};

export type VacData = {
  type: 'vaccine';
  date: string;
  product: string;
  issuer: string;
};

export type RecData = {
  type: 'recovery';
  dateFrom: string;
  dateUntil: string;
  issuer: string;
};

export type TestData = {
  type: 'test';
  date: string;
  result: string;
  issuer: string;
};

const mapCertData = (
  data: VacPass,
): VacData | RecData | TestData | {type: 'nothing'} => {
  if ('v' in data) {
    return {
      type: 'vaccine',
      date: data.v[0].dt,
      product: data.v[0].mp,
      issuer: data.v[0].is,
    };
  }
  if ('r' in data) {
    return {
      type: 'recovery',
      dateFrom: data.r[0].df,
      dateUntil: data.r[0].du,
      issuer: data.r[0].is,
    };
  }
  if ('t' in data) {
    return {
      type: 'test',
      date: data.t[0].sc,
      result: data.t[0].tr,
      issuer: data.t[0].is,
    };
  }
  return {type: 'nothing'};
};

export const decodeService = {decodeVacPass, mapCertData};

import nacl from 'tweetnacl'
import { encode as encodeUTF8 } from '@stablelib/utf8'
import {
  encode as encodeBase64,
  decode as decodeBase64,
} from '@stablelib/base64'

import { VerificationSignatureOptions } from '../types'
import basestring from './basestring'

export default function (privateKey: string) {
  function generateSignature({
    transactionId,
    formId,
    fieldId,
    answer,
  }: VerificationSignatureOptions): string {
    const time = Date.now()
    const data = basestring({ transactionId, formId, fieldId, answer, time })
    const signature = nacl.sign.detached(
      encodeUTF8(data),
      decodeBase64(privateKey)
    )
    return `f=${formId},v=${transactionId},t=${time},s=${encodeBase64(
      signature
    )}`
  }

  return generateSignature
}
import { OffchainConfig } from '../commands/contracts/ocr2/setConfig'
import { Proto, sharedSecretEncryptions } from '@chainlink/gauntlet-core/dist/crypto'
import { join } from 'path'

export const serializeOffchainConfig = async (input: OffchainConfig): Promise<string> => {
  const { configPublicKeys, f, ...validInput } = input
  const proto = new Proto.Protobuf({ descriptor })
  const reportingPluginConfigProto = proto.encode(
    'offchainreporting2_config.ReportingPluginConfig',
    validInput.reportingPluginConfig,
  )
  const sharedSecretEncryptions = await generateSecretEncryptions(configPublicKeys)
  const offchainConfig = {
    ...validInput,
    offchainPublicKeys: validInput.offchainPublicKeys.map((key) => Buffer.from(key, 'hex')),
    reportingPluginConfig: reportingPluginConfigProto,
    sharedSecretEncryptions,
  }
  return Buffer.from(proto.encode('offchainreporting2_config.OffchainConfigProto', offchainConfig)).toString('base64')
}

// constructs a SharedSecretEncryptions from
// a set of SharedSecretEncryptionPublicKeys, the sharedSecret, and a cryptographic randomness source
const generateSecretEncryptions = async (
  operatorsPublicKeys: string[],
): Promise<sharedSecretEncryptions.SharedSecretEncryptions> => {
  const gauntletSecret = process.env.SECRET
  const path = join(process.cwd(), 'packages-ts/gauntlet-terra-contracts/artifacts/bip-0039', 'english.txt')
  const randomSecret = await sharedSecretEncryptions.generateSecretWords(path)
  return await sharedSecretEncryptions.makeSharedSecretEncryptions(gauntletSecret!, operatorsPublicKeys, randomSecret)
}

// Autogenerated from ocr2Proto.proto with Protobuf.toJSON()
export const descriptor = {
  nested: {
    offchainreporting2_config: {
      nested: {
        OffchainConfigProto: {
          fields: {
            deltaProgressNanoseconds: { type: 'uint64', id: 1 },
            deltaResendNanoseconds: { type: 'uint64', id: 2 },
            deltaRoundNanoseconds: { type: 'uint64', id: 3 },
            deltaGraceNanoseconds: { type: 'uint64', id: 4 },
            deltaStageNanoseconds: { type: 'uint64', id: 5 },
            rMax: { type: 'uint32', id: 6 },
            s: { rule: 'repeated', type: 'uint32', id: 7 },
            offchainPublicKeys: { rule: 'repeated', type: 'bytes', id: 8 },
            peerIds: { rule: 'repeated', type: 'string', id: 9 },
            reportingPluginConfig: { type: 'bytes', id: 10 },
            maxDurationQueryNanoseconds: { type: 'uint64', id: 11 },
            maxDurationObservationNanoseconds: { type: 'uint64', id: 12 },
            maxDurationReportNanoseconds: { type: 'uint64', id: 13 },
            maxDurationShouldAcceptFinalizedReportNanoseconds: { type: 'uint64', id: 14 },
            maxDurationShouldTransmitAcceptedReportNanoseconds: { type: 'uint64', id: 15 },
            sharedSecretEncryptions: { type: 'SharedSecretEncryptionsProto', id: 16 },
          },
        },
        SharedSecretEncryptionsProto: {
          fields: {
            diffieHellmanPoint: { type: 'bytes', id: 1 },
            sharedSecretHash: { type: 'bytes', id: 2 },
            encryptions: { rule: 'repeated', type: 'bytes', id: 3 },
          },
        },
        ReportingPluginConfig: {
          fields: {
            alphaReportInfinite: { type: 'bool', id: 1 },
            alphaReportPpb: { type: 'uint64', id: 2 },
            alphaAcceptInfinite: { type: 'bool', id: 3 },
            alphaAcceptPpb: { type: 'uint64', id: 4 },
            deltaCNanoseconds: { type: 'uint64', id: 5 },
          },
        },
      },
    },
  },
}

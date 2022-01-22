import { AbstractInstruction, instructionToCommand } from '../../abstract/wrapper'

type CreateGroupInput = {
  members : string
  admin: BigInt64Array
}

async function makeCreateGroupInput(flags: any): Promise<CreateGroupInput> {
  if (flags.input)
    return flags.input as CreateGroupInput
  const members = flags.members
  const admin = flags?.admin
  return {
    members: members,
    admin: admin
  }
}

/ TODO: Add validation
const validateCreateGroupInput = (input: CreateGroupInput): boolean => {
  return true
}

async function makeGroupInitParams (Promise<CreateGroupInput>) => {
  

}

type CreateWalletInput = {
  owners : string
  threshold: number
}

const makeCreateWalletInput = async (flags: any): Promise<CreateWalletInput> => {
  if (flags.input) return flags.input as CreateWalletInput
  const members = flags.members
  const admin = flags?.admin
  return {
    members: members
    admin: admin
  }
}

/ TODO: Add validation
const validateCreateWalletInput = (input: CreateWalletInput): boolean => {
  return true
}

async function makeWalletInitParams (Promise<WalletInitParams>) => {


}

const createGroupInstruction:  AbstractInstruction<CommandInput, ContractInput> = {
  instruction: {
    contract: 'cw4_group'
    function: 'deploy'
  },
  makeInput: makeCreateGroupInput
  validateInput: validateInput
  makeContractInput: makeGroupInitParams
}

export default instructionToCommand(deployInstruction)

// Creates a multisig wallet backed by a previously created cw4_group
const createWalletInstruction: AbstractInstruction<CommandInput, ContractInput> = {
  instruction: {
    contract: 'cw3_flex_multisig'
    function: 'deploy'
  },
  makeInput: makeCreateWalletInput
  validateInput: validateInput
  makeContractInput: makeWalletInitParams
}

export default instructionToCommand(createGroupInstruction)
export default instructionToCommand(createWalletInstruction)

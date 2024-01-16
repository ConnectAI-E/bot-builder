import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import * as authCommand from './auth'
import * as infoCommand from './info'
import * as deployCommand from './deploy'
import * as showCommand from './show'

const args = yargs(hideBin(process.argv))
  .scriptName('botops')
  .wrap(100)
  .command(infoCommand)
  .command(authCommand)
  .command(deployCommand)
  .command(showCommand)
  .demandCommand(1, 'Please provide a command')
  .usage('$0 [command] [options]')
  .epilogue('👻 Explore our manual on https://github.com/ConnectAI-E/botops')
  .example('$0 info', 'Check current authorization status')
  .example('$0 auth --feishu', 'Interactively log in and authorize with Feishu')
  .example('$0 deploy bot.json ', 'Deploy the bot to a specific platform using a local configuration file')
  .example('$0 deploy https://example/bot.json ', 'Deploy the bot to a specific platform using a remote configuration URL')
  .example('$0 show cli_a52ca0ba25b2100d', 'Show the detail of a feishu app')

  .help()
  .argv

export default args

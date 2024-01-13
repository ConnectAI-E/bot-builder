// commands/auth.ts
import type { Argv } from 'yargs'
import ora from 'ora'
import select, { Separator } from '@inquirer/select'
import { FeishuConfigManager, fakeFeishuConfig } from './config'

export const command = 'auth'
export const describe = 'View current authorization status or reauthorize for specific bot platform'

export function builder(yargs: Argv) {
  return yargs
    .option('feishu', {
      describe: 'Reauthorize Feishu',
      type: 'boolean',
      alias: 'f',
    })
    .option('dingtalk', {
      describe: 'Reauthorize DingTalk',
      type: 'boolean',
    })
}

export async function handler(argv: any) {
  if (argv.feishu) {
    reauthorizeFeishu()
  }
  else if (argv.dingtalk) {
    console.log('Reauthorizing DingTalk')
  }
  else {
    const answer = await select({
      message: 'Select a bot platform',
      choices: [
        {
          name: 'feishu',
          value: 'feishu',
          description: '先进团队先用飞书',
        },
        {
          name: 'dingtalk',
          value: 'dingtalk',
          description: '让进步发生',
        },
        new Separator(),
      ],
    })
    if (answer === 'feishu')
      reauthorizeFeishu()
  }
}

function reauthorizeFeishu() {
  const spinner = ora('Reauthorizing Feishu').start()
  const config = FeishuConfigManager.getInstance()
  config.setFeishuConfig(fakeFeishuConfig)
  spinner.succeed('Reauthorized Feishu')
}

function checkFeishuAuth() {
  const spinner = ora().start()
  const config = FeishuConfigManager.getInstance()
  spinner.info('checking auth status')
  if (config.isAuth())
    spinner.succeed('飞书已经授权')
  else
    spinner.fail('飞书未授权')
}

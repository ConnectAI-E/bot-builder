import fetch from 'node-fetch'

export interface DingTalkLoginCookies {
  account: string
  deviceid: string
  corp_id: string
  _o_a_u: string
  access_token: string
}

export class Configuration {
  _account: string
  _deviceid: string
  _corp_id: string
  _o_a_u: string
  access_token: string
  baseUrl = 'https://open-dev.dingtalk.com'
  constructor(opt: DingTalkLoginCookies) {
    this._account = opt.account
    this._deviceid = opt.deviceid
    this._corp_id = opt.corp_id
    this._o_a_u = opt._o_a_u
    this.access_token = opt.access_token
  }

  get headers() {
    const headers = {} as any

    if (typeof window == 'undefined') {
      // Code is not running in a browser environment, set the "Cookie" header
      headers.Cookie = `account=${this._account}; deviceid=${this._deviceid}; corp_id=${this._corp_id}; _o_a_u=${this._o_a_u}; access_token=${this.access_token}`
    }

    return headers
  }

  async fetchRequestText(url, options) {
    const response = await fetch(url, options)
    console.log(response.headers)
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`)

    return response.text()
  }

  async fetchRequestJson(url, options) {
    const response = await fetch(url, options)
    if (!response.ok)
      throw new Error(`Network response was not ok: ${response.status} - ${response.statusText}`)

    return response.json()
  }

  aGetRequest(url: string): any {
    const link = `${this.baseUrl}/${url}`
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      referrerPolicy: 'no-referrer',
      cors: true,
      headers: this.headers,
    }
    return this.fetchRequestJson(link, options)
  }

  aPostRequest(url: string, body?: any): any {
    const link = `${this.baseUrl}/${url}`
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      referrerPolicy: 'no-referrer',
      headers: this.headers,
      redirect: 'follow',
      body: JSON.stringify(body),
    }
    return this.fetchRequestJson(link, options)
  }

  aPostMultipartRequest(url: string, body?: any): any {
    const link = `${this.baseUrl}/${url}`
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      referrerPolicy: 'no-referrer',
      headers: this.headers,
      redirect: 'follow',
      body,
    }
    return this.fetchRequestJson(link, options)
  }

  aPutRequest(url: string, body: any): any {
    const link = `${this.baseUrl}/${url}`
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      referrerPolicy: 'no-referrer',
      headers: this.headers,
      redirect: 'follow',
      body: JSON.stringify(body),
    }
    return this.fetchRequestJson(link, options)
  }

  aDeleteRequest(url: string): any {
    const link = `${this.baseUrl}/${url}`
    const options = {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      referrerPolicy: 'no-referrer',
      headers: this.headers,
      redirect: 'follow',
    }
    return this.fetchRequestJson(link, options)
  }

  async requestAppList() {
    const url = `${this.baseUrl}/openapp/orginnerapp/listByCondition`
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
      referrerPolicy: 'no-referrer',
      headers: this.headers,
    }
    console.log(options)

    return await this.fetchRequestText(url, options)
  }
}
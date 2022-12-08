import axios from 'axios';
import { load } from 'cheerio'


let Cookie = ""
let messageTitle = ""
let messageContent = ""

/**
 * 发送微信消息
 */
function sendMesage() {
  return new Promise((resolve, reject) => {
    const axiosParams = {
      method: 'post',
      url: 'https://sctapi.ftqq.com/SCT186327Txsp3EnbkE9Jf2JVRc5zhRrsM.send',
      // 自定义请求头
      headers: { 'Content-type': 'application/json;charset=utf-8' },
      data: {
        title: messageTitle,
        desp: messageContent,
      }
    }
    axios(axiosParams).then(res => {
      console.log(res.data);
      resolve(res)
    }).catch(err => {
      console.log(err);
      reject(err)
    });
  })
}

/**
 * 获取剩余流量信息
 * @returns 
 */
function getVpnUserInfo() {
  return new Promise((resolve, reject) => {
    const axiosParams = {
      method: 'get',
      url: 'https://w1.v2free.net/user',
      // 自定义请求头
      headers: { 'Cookie': Cookie },
    }
    axios(axiosParams).then(res => {
      const $ = load(res.data);
      let surplus = $('.progressbar').text()
      surplus = String(surplus).replace(/\s*/g, "");
      messageContent = surplus
      console.log(surplus)
      resolve(res)
    }).catch(err => {
      console.log(err);
      reject(err)
    });
  })
}

/**
 * 设置cookie
 * @param {*} c 
 */
function setCookie(c) {
  let cStartIndex = c.indexOf("key=") + 4
  let cEndIndex = c.slice(cStartIndex)
  let cookieKey = cEndIndex.slice(0, cEndIndex.indexOf(";"))
  let eStartIndex = c.indexOf("expire_in=") + 10
  let eEndIndex = c.slice(eStartIndex)
  let cookieExpire = eEndIndex.slice(0, eEndIndex.indexOf(";"))
  Cookie = `_ga=GA1.1.1103738679.1670468296; uid=1795; email=962271461%40qq.com; _gcl_au=1.1.165852321.1670468316; key=${cookieKey}; ip=bd4647a77b1b3bd3ef4a72abfa227d2d; expire_in=${cookieExpire}; _ga_NC10VPE6SR=GS1.1.1670468296.1.1.1670469496.0.0.0`
}

/**
 * 登录
 * @returns 
 */
function login() {
  return new Promise((resolve, reject) => {
    const axiosParams = {
      method: 'post',
      url: 'https://w1.v2free.net/auth/login',
      data: {
        email: "962271461@qq.com",
        passwd: "laohu12345",
        code: ""
      }
    }
    axios(axiosParams).then(res => {
      let c = String(res.headers['set-cookie'])
      setCookie(c)
      resolve(res)
    }).catch(err => {
      console.log(err);
      reject(err)
    });
  })
}

/**
 * 签到
 * @returns 
 */
function signin() {
  return new Promise((resolve, reject) => {
    console.log(Cookie);
    const axiosParams = {
      method: 'post',
      url: 'https://w1.v2free.net/user/checkin',
      // 自定义请求头
      headers: { 'Cookie': Cookie },
    }
    axios(axiosParams).then(res => {
      console.log(res.data.msg)
      messageTitle = res.data.msg
      resolve(res)
    }).catch(err => {
      console.log(err);
      reject(err)
    });
  })
}

async function start() {
  await login()
  await signin()
  await getVpnUserInfo()
  await sendMesage()
}

export default start
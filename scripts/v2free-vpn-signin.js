import axios from 'axios';

const axiosParams = {
    method: 'post',
    url: 'https://w1.v2free.net/user/checkin',
    // 自定义请求头
    headers: { 'Cookie': '_ga=GA1.1.357112228.1665193827; _gcl_au=1.1.481341354.1665193831; uid=1795; email=962271461%40qq.com; key=c8e0aa6020c0347547063fbb71b9b52bfa14155d242b5; ip=92f2a24881ee753d87a0f9aa9b8abe3a; expire_in=1670401888; _ga_NC10VPE6SR=GS1.1.1670318055.29.1.1670318360.0.0.0' },
}

axios(axiosParams).then(res => {
    console.log(res.data.msg)
});
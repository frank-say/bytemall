import { promisifyAll } from 'miniprogram-api-promise';

// promisify all wx's api
export var wxp = {}
promisifyAll(wx, wxp)
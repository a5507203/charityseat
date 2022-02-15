class HttpRequest {
    constructor() {
      this.token = ''
      this.eventsId = ''
    }
  
    get(url, params) {
      return this.request({
        path: url,
        params: params,
        method: 'GET'
      })
    }
  
    post(url, data) {
      return this.request({
        path: url,
        data,
        method: 'POST'
      })
    }
  
    delete(url, data) {
      return this.request({
        path: url,
        data,
        method: 'DELETE'
      })
    }
  
    put(url, data) {
      return this.request({
        path: url,
        data,
        method: 'PUT'
      })
    }
  
    init() {
      const arr = window.location.search
                    .replace('?', '').split('&')
      for(const item of arr) {
        const item2 = item.split('=')
        switch(item2[0]) {
          case 'token':
            this.token = item2[1]
            break
          case 'events_id':
            this.eventsId = item2[1]
            break
        }
      }
    }
  
    async request(option) {
      const fetchOption = {
        method: option.method,
        headers: {
          ...(option.headers || {})
        }
      };
      let url = option.path;
      if(this.token) {
        fetchOption.headers['Authorization'] = decodeURIComponent(this.token)
      }
  
      if (option.method !== 'GET') {
        if (option.data) fetchOption.body = JSON.stringify(option.data)
        // body = this.serializationParams(option.data);
        fetchOption.headers['Content-Type'] = 'application/json';
      }
      if (option.params) {
        url += `?${this.serializationParams(option.params)}`;
      }
      try {
        const res = await fetch(url, fetchOption);
        const data = await res.json();
        if (data.code !== 200) {
          if(data.code === 401) {
            // TODO: 用户 token 失效, 需要重新登录的提示
            console.log(data.message)
          }
          throw new Error(data.message || data.errmsg);
        }
        return data.data;
      } catch (err) {
        if (err instanceof SyntaxError) {
          throw new Error(`server error: ${err.message}`);
        }
        throw err;
      }
    }
  
    serializationParams(params) {
      if (typeof (params) === 'string') {
        return params;
      }
      const arr = [];
      for (const i in params) {
        const item = params[i]
        if(item !== undefined && item !== null) {
          if (typeof item === 'string') {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(params[i]));
          }
          else {
            arr.push(encodeURIComponent(i) + '=' + encodeURIComponent(JSON.stringify(params[i])));
          }
        }
      }
      return arr.join('&');
    }
  }
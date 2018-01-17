// (C) Copyright 2015-2018 Hewlett Packard Enterprise Development LP
import JSCookie from 'js-cookie';

export default {
  get (name) {
    return JSCookie.get(name);
  },
  set (name, value, expires, path, domain, secure) {
    return JSCookie.set(name, value, { expires, path, domain, secure } );
  },
  remove (name, path, domain) {
    JSCookie.remove(name, { path, domain });
  },
  has (name) {
    return JSCookie.get(name) ? true : false;
  },
  keys () {
    return Object.keys(JSCookie.get());
  }
};

(function(){
    var storage = function(type){
        return new fnStorage.init(type);
    },
    fnStorage = {
        init: function(type){
            if(type == 'session'){
                this.store = sessionStorage;
            }else if(type == 'local'){
                this.store = localStorage;
            }else{
                alert("wrong type");
                return ;
            }
            return this;
        },
        set: function(name,value){
            if( this.isArr(name) && this.isArr(value) ){
                for(var i = 0, len = name.length; i < len ; i++){
                    this.set(name[i],value[i]);
                }
            }else{
                this.store.setItem(name,value);
            }
            return this;
        },
        get: function(name){
            if( this.isArr(name) ){
                var arr = [];
                for(var i = 0, len = name.length; i < len; i++){
                    var val = this.get(name[i]);
                    if(val){
                        arr.push(val);
                    }
                }
                return arr;
            }else{
                var val = this.store.getItem(name);
            }
            return val;
        },
        remove: function(name){
            if( this.isArr(name) ){
                for(var i = 0, len = name.length; i < len; i++){
                    this.remove(name[i]);
                }
            }else{
                this.store.removeItem(name);   
            }
            return this;
        },
        clear: function(){
            this.store.clear();
            return this;
        },
        len: function(){
            return this.store.length;
        },
        getAll: function(callBack){
            var reArr = [];
            for(var i = 0,len = this.len(); i < len; i++){
                var name = this.store.key(i);
                var value = this.get(name);
                
                if( callBack === undefined ){
                    reArr[name] = value;
                }else{
                    callBack.call(this,name,value);
                }
            }
            
            if( callBack === undefined ){
                return reArr;
            }
        },
        isArr: function(obj){
            return typeof obj.sort === "function" ? true :false;
        },
        change: function(type){
            return this.init(type);
        }
    }
    fnStorage.init.prototype = fnStorage;
    
    window.fnStorage = storage;
})();

window.onload = function(){
    var storage = fnStorage('local');
}

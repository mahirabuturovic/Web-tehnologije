var BitBucket=(function(){
    var konstruktor=function(key,secret){
        return{
            ucitaj:function(nazivRepSpi, nazivRepVje,callback){
                return[{
                    "imePrezime": "Angelina Jolie",
                    "index":"index1"
                },{
                    "imePrezime": "Martin Garix",
                    "index":"index2"
                },{
                    "imePrezime": "Lady Gaga",
                    "index":"index3"
                },{
                    "imePrezime": "Dino Merlin",
                    "index":"index4"
                },{
                    "imePrezime": "Neko Nekic",
                    "index":"index5"
                }];
            }
        }
    }
    return konstruktor;
}())
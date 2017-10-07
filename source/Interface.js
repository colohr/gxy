const { GraphQLClient } = require('graphql-request')
const tagger = require('graphql-tag')

class Interface{
	static get Client(){ return GraphQLClient }
	static get tagger(){ return tagger }
	constructor(endpoint,options){
		this.url = endpoint
		this.client = new GraphQLClient(endpoint,options)
	}
	get(...x){
		return this.client.request(...x).then(data=>{
			let names = Object.keys(data)
			if(names.length === 1){
				let name = names[0]
				return data[name]
			}
			return data
		})
	}
	get tagger(){ return this.constructor.tagger }
}

//exports
module.exports = Interface

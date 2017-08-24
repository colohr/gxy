const { GraphQLClient } = require('graphql-request')
const Schema = require('./Schema')

class Interface{
	static get Client(){ return GraphQLClient }
	constructor(endpoint,options){
		this.url = endpoint
		this.client = new GraphQLClient(endpoint,options)
		
	}
	get schema(){ return this[Schema.symbol] }
	get_schema(){ return get_schema(this) }
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
	connect(){ return new Promise((success,error)=>this.get_schema().then(schema=>success(this)).catch(error)) }
}

//exports
module.exports = Interface
//shared actions
function get_schema(face){
	return new Promise((success,error)=>{
		if(Schema.symbol in face) return success(face[Schema.symbol])
		face[Schema.symbol] = new Schema()
		return face[Schema.symbol].load(face.client).then(schema=>success(schema)).catch(error)
	})
}
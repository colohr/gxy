
const schema_map = Symbol('Schema')
class Schema extends Map{
	static get symbol(){ return schema_map }
	constructor(){
		super()
	}
	load(client){ return load_schema(client,this) }
	apply(data){
		this.queries = get_queries(data)
		this.type = get_types(data)
		return this
	}
	
}

//exports
module.exports = Schema
//shared actions
function get_queries(data){
	let queries = new Map()
	for(let query of data.queryType.fields) queries.set(query.name,query)
	return queries
}
function get_types(data){
	let types = new Map()
	for(let type of data.types) types.set(type.name,type)
	return types
}
function load_schema(client,schema){
	return client.request(`query Schema{
		  __schema{
		    queryType {
		      name
		      description
		      fields {
		        description
		        name
		        args {
		          name
		          type {
		            name
		            description
		            kind
		            ofType {
		              name
		              description
		            }
		          }
		        
		        }
		        type {
		          name
		          description
		          kind
		          ofType {
		            name
		            description
		          }
		        }
		      }
		    }
		    types {
		      name
		      description
		    }
		  }
		}`).then(data=>data.__schema).then(data=>schema.apply(data))
}
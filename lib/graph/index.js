import gql from 'graphql-tag';
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
	
(function( factory, includeTypes){ return factory( includeTypes) })
(function factory( includes ){
	
	const window = includes.window
	const apollo = Symbol.for('Apollo Client')
	const interface_options = Symbol.for('Interface Options')
	const tagger = includes.gql
	
	
	class InOut{
		
		static tag(value){ return this.tagger`${value}` }
		
		static get tagger(){ return tagger }
		
		static valid_object(value,type){
			return typeof value === 'object' &&
				value !== null &&
				type in value &&
				this.valid_string( value[type] )
		}
		
		static valid_string(value){
			return typeof value === 'string' &&
				   value.includes('{')
		}
		
		constructor(value,mutation){
			
			if( this.constructor
			        .valid_object( value, 'query' ) ||
				this.constructor
				    .valid_object( value, 'mutation' ) ){
				
				Object.assign( this, value )
			
			}
			
			else if( mutation &&
					 this.constructor
					     .valid_string(value) ) this.mutation = this.constructor
			                                                        .tag(value)
			
			else if( this.constructor
			             .valid_string(value) ) this.query = this.constructor
			                                                     .tag(value)
			
		}
		
		get valid(){ return 'query' in this || 'mutation' in this }
		
		toString(){
			return `InOut{
						${this.query}
					}`
		}
	}
	
	
	class IOError extends Error{
		constructor(message,error){
			super(message)
			this.original = error
			this.message = `
				${error}\n\n
				-------------------------------------
				💩😡
				${this.message}
				-------------------------------------
				For further assistance see more info @ IO.instructions.
			`
		}
	}
	
	
	class Interface{
		
		constructor(options){
			
			let batching = 'batching' in options ? options.batching : true
			
			let host = `${window.location.protocol}//${window.location.host}`
			
			let web_address = [host].concat(options.webpaths).join('/')
			
			this.networkInterface = includes.createNetworkInterface({
				uri:web_address,
				transportBatching:batching
			})
			
			this.queryTransformer = includes.addTypename
			
		}
		
	}
	
	
	class IO{
		
		//readonly classes
		static get Interface(){ return Interface }
		static get InOut(){ return InOut }
		
		//readonly values
		static get instructions(){
			return `
				• Use the query action to create a valid query string/object thing.
				• The gql action/method is the same as tag action/method.
				• Example of IO options:
					⥱ {
						interface:{  //💩 _opts
							// The interface → webpaths means the💩 networkInterface →💩 uri.
							webpaths: ['api','graph','ql']
						}
					  }
				• Example of query object:
					⥱ {
						//Must use tagger/💩 gql 
						//IO.tag
						query:IO.tag(\`{
								name
							}\`)
					}
			`
		}
		
		constructor(options){
			
			if( typeof options !== 'object' ||
				options === null ) {
				
				options = {
					interface: {
						webpaths: [ 'graph', 'ql' ]
					}
				}
				
			}
			
			this[interface_options] = new Interface(options.interface)
			
		}
		get interface(){
			if(apollo in this) return this[apollo]
			return this[apollo] = new includes.ApolloClient( this[interface_options] )
		}
		set interface(options_for_interface){
			delete this[apollo]
			if( options_for_interface instanceof Interface ) this[interface_options] = options_for_interface
			else this[interface_options] = new Interface(options_for_interface)
			return this[interface_options]
		}
		
		//query
		get(io){
			io = new InOut(io)
			return new Promise((resolve,reject)=>{
				if(!io.valid) return reject( new IOError( 'Your graphql "io" is not valid to query. IO.get' ) )
				return this.interface
				           .query(io)
				           .then( response => { return resolve(response.data) } )
				           .catch( error => {
								return reject( new IOError( 'IO.get "io" graphql response error.', error) )
				           })
			})
		}
		
		//mutation
		set(io){
			io = new InOut( io, true )
			return new Promise( (resolve,reject) => {
				if(!io.valid) return reject( new IOError('Your graphql "io" graphql is not valid for a mutation. IO.set') )
				return this.interface
				           .mutate( io )
				           .then( response => { return resolve( response.data ) } )
				           .catch( error => {
								return reject( new IOError( 'IO.set "io" graphql response error.', error ) )
				           })
			} )
		}
		
	}
	
	
	return window.IO = IO
	
},{ ApolloClient, addTypename, createNetworkInterface, gql, window })


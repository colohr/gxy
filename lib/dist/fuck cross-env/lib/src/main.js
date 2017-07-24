import gql from 'graphql-tag';
import ApolloClient, { createNetworkInterface, addTypename } from 'apollo-client';
import GraphableBanks from './BanksData';
import Dash from './GraphDash';

(function(root,factory,includeTypes){
    return factory(root,includeTypes)
})(window,function factory(window,includes){
	
	const gql = includes.gql;
	const GraphableBanks = includes.GraphableBanks;
	const Dash = includes.Dash;
	
	const apolloClient = new includes.ApolloClient({
		networkInterface: includes.createNetworkInterface({
			uri: `${window.location.protocol}//${window.location.host}/graph/ql`,
			transportBatching: true
		}),
		queryTransformer: includes.addTypename
	});
	
	const Bank = Symbol.for('Bank')
	const QString = Symbol.for('QueryString')
	
	const GraphsQueryMap = new Map()
	const GraphsQuery = new Proxy(GraphsQueryMap,{
		get(o,k){
			if(o.has(k)) return o.get(k)
			else if(k in o) return o[k];
			return;
		}
	});
	
	
	class GraphQuery{
		static tag(q){return gql`${q}`}
		static get client(){return apolloClient;}
		constructor(string){
			this[QString] = string;
		}
		get queryString(){return this.constructor.tag(this[QString]);}
		get client(){return this.constructor.client}
		get query(){return {query:this.queryString}}
		send(gets){
			if(typeof gets !== 'string') gets = 'data'
			if(!gets.indexOf('data') !== 0) gets = `data.${gets}`
			return this.client
			           .query(this.query)
			           .then(res=>Dash.get(res,gets));
		}
		toString(){return this.queryString}
		valueOf(){return this.query}
	}
	
	const Graphs = new Proxy({
		queries:GraphsQuery,
		get tag(){return GraphsQuery.tag},
		get client(){return GraphsQuery.client},
		query(string){return new GraphQuery(string)}
	}, {
		get(o,k){
			if(k in o) return o[k];
			return;
		}
	});
	
	class GraphBase{
		static get graph(){ return Graphs; }
		constructor(){}
	}
	
	
	class Graph extends GraphBase{
		static get Base(){return GraphBase}
		static get Query(){return GraphQuery}
		static get Bank(){return GraphableBanks;}
		static get queries(){return GraphsQueryMap;}
		static has(name){return this.queries.has(name);}
		static get(name){return this.queries.get(name);}
		static set(name,value){return this.queries.set(name,value);}
		static delete(name){return this.queries.delete(name);}
		constructor(){ super(); }
		get Bank(){return this.constructor.Bank}
		get graph(){return this.constructor.graph}
		query(...args){return this.graph.query(args[0]).send(args[1])}
		bank(bank){
			if(this.graphable(Bank,bank)){
				let qs = this.graph.queries.getBank(bank);
				return this.query(qs,'getBank');
			}
			return new Promise(( resolve, reject )=>{ return reject( new Error('Title for bank does not exist.') ); });
		}
		graphable(type,value){
			switch(type){
				case Bank:
					return this.Bank.Names.includes(value)
					break;
				default: break;
			}
			return true;
		}
	}
	
    return window.Graph=Graph;
	
},{ ApolloClient,
	createNetworkInterface,
	addTypename,
	gql,
	GraphableBanks,
	Dash
});


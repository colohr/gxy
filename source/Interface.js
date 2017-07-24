
//import { createNetworkInterface } from 'apollo-client';
//import { PolymerApolloMixin } from 'polymer-apollo';


//const { PolymerApolloMixin } = require('polymer-apollo')

//import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';

// Polyfill fetch
//import 'isomorphic-fetch';


//import createApolloClient from './helpers/create-apollo-client';

//const subscriptionsURL = process.env.NODE_ENV !== 'production'
//	? 'ws://localhost:3010/subscriptions'
//	: 'ws://api.githunt.com/subscriptions';

//const wsClient =

//const networkInterface =

//const networkInterfaceWithSubscriptions =
//const {createApolloClient} = require('./helpers/create-apollo-client')

const { ApolloClient, createNetworkInterface } = require('apollo-client')
const { SubscriptionClient, addGraphQLSubscriptions } = require('subscriptions-transport-ws')
const gql = require('graphql-tag')
//exports
const Interface = {
	client:create_apollo_client_interface,
	Client:{
		Apollo:ApolloClient,
		Subscription:SubscriptionClient
	},
	logic:{
		add_subscriptions_to_network_interface,
		create_apollo_client_interface,
		create_network_interface,
		create_subscriptions_socket_client,
		get_client_options
	},
	tagger:gql
}

module.exports = Interface

//module.exports = create_apollo_client_interface
//
//module.exports.Client = {
//	Apollo:ApolloClient,
//	Subscription:SubscriptionClient
//}

//module.exports.logic = {
//	add_subscriptions_to_network_interface,
//	create_apollo_client_interface,
//	create_network_interface,
//	create_subscriptions_socket_client,
//	get_client_options
//}
//
//module.exports.tagger = gql

//shared actions
function add_subscriptions_to_network_interface(subscriptions,network_interface){
	return addGraphQLSubscriptions( network_interface, create_subscriptions_socket_client(subscriptions) )
}

function create_apollo_client_interface(url,subscriptions_url){
	let network_interface = create_network_interface(url)
	if(typeof subscriptions_url === 'string') add_subscriptions_to_network_interface(subscriptions_url,network_interface)
	let options = Object.assign({}, {
		addTypename: true,
		//dataIdFromObject(result){
		//	if (result.id && result.__typename) return result.__typename + result.id
		//	return null
		//},
		shouldBatch: true
	}, get_client_options(network_interface))
	return new ApolloClient(options)
}

function create_network_interface(url,options,cache_results){
	if(typeof url === 'string'){
		if(typeof options !== 'object' || options === null) options = {credentials: 'same-origin'}
		if(typeof cache_results !== 'boolean') cache_results = true
		return createNetworkInterface({
			uri: url,
			opts: options,
			transportBatching: cache_results
		})
	}
	throw new Error(`Provide a valid url to create the network interface`)
}

function create_subscriptions_socket_client(web_socket_url){
	if(web_socket_url instanceof SubscriptionClient) return web_socket_url
	else if(typeof web_socket_url === 'string') return new SubscriptionClient(web_socket_url, { reconnect: true })
	throw new Error(`Provide a web socket url for the subscription client.`)
}

function get_client_options(network_interface,client_options){
	if(typeof client_options !== 'object' || client_options === null) client_options = {}
	return Object.assign(client_options,{
		networkInterface: network_interface,
		//initialState: window.__APOLLO_STATE__,
		ssrForceFetchDelay: 100
	})
}



//export const apolloClient = createApolloClient({
//	networkInterface: networkInterfaceWithSubscriptions,
//	initialState: window.__APOLLO_STATE__,
//	ssrForceFetchDelay: 100,
//});

// Enable Apollo dev tools
//window.__APOLLO_CLIENT__ = apolloClient;

//export const PolymerApolloClass = PolymerApolloMixin({ apolloClient }, Polymer.Element);

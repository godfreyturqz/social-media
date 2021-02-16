export class LocalStorage {

	constructor(){
		this.stateKey = 'userState'
		this.maxAge = new Date().getTime() + 86_400_000 // 1day
	}

	saveState(value){
		const state = {value, maxAge: this.maxAge}
		const serializedState = JSON.stringify(state)
		localStorage.setItem(this.stateKey, serializedState)
	}

	loadState(){
		const serializedState = localStorage.getItem(this.stateKey)
		if (serializedState === null) return null

		const storedState = JSON.parse(serializedState)

		if (new Date().getTime() > storedState.maxAge) {
			localStorage.removeItem(this.stateKey)
			return null
		} else {
			return storedState.value
		}
	}
}
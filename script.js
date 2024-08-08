const tags = document.getElementsByTagName("h1")
console.log(tags)
Array.from(tags).map(element => {
	element.addEventListener("click", (e)=>{
	console.log("Ran")
	console.log(window.location.href)
	});
})
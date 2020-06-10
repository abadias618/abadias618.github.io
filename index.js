
var observer = new IntersectionObserver(function(entries) {
	if(entries[0].isIntersecting === true){
        console.log('Element is fully visible in screen');
        console.log(entries[0]);
        entries[0].target.style.visibility = "visible";
        entries[0].target.classList.add('animate__animated','animate__fadeInUp');
    }
}, { threshold: [1] });

window.onload = function () {
    observer.observe(document.querySelector('#bubbles'));
}

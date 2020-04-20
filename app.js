const jobList = document.querySelector("#job-list");
const form = document.querySelector("#add-job-form");

function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = "x";

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);

    jobList.appendChild(li);

    cross.addEventListener("click", (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute("data-id");
        db.collection("jobs").doc(id).delete();
    });
}

//gets data
db.collection("jobs").where("city", "==", "Prontera").orderBy("name").get().then((snapshot) => {
    snapshot.docs.forEach(doc => {
        renderCafe(doc);
    });
})

//saves data
form.addEventListener("submit", (e) => {
    e.preventDefault();
    db.collection("jobs").add({
        name: form.name.value,
        city: form.city.value
    });
    form.name.value = "";
    form.city.value = "";
});
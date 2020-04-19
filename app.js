const jobList = document.querySelector("#job-list");
const form = document.querySelector("#add-job-form");

function renderCafe(doc) {
    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute("data-id", doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);

    jobList.appendChild(li);
}

//gets data
db.collection("jobs").get().then((snapshot) => {
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
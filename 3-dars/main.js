document.querySelector('form').addEventListener('submit', async function(e) {
    try {
        e.preventDefault();

        document.querySelector(".body").style.display = "block"

        let username = document.querySelector('input').value;
        let fetchUrl =  `https://api.github.com/users/${username}`;
        let repoUrl = `https://api.github.com/users/${username}/repos`

        let response = await fetch(fetchUrl);
        let repo = await fetch(repoUrl);
        if(!response.ok) {
            throw new Error('user not found')
        }

        let repository = await repo.json();
        
        repository.forEach(function(repo) {
            document.querySelector('ul.repo-list').innerHTML += `<li>${repo.name}</li>`
        })   

        let user = await response.json();
        document.querySelector('img').src = user.avatar_url;
        document.querySelector(".username").innerHTML = user.name

       
       
    } catch(e) {
        document.querySelector(".repository").innerHTML = "<h1>User not found</h1>"
        document.querySelector('img').src = "";
        document.querySelector(".username").innerHTML = ""
    };
});

// Github API bilan:
// - githubdan userlarni search qilish
// - repo’larni search qilish (malum bir user uchunmas umumiy githubdagi barcha repo’lar orasidan)
// - topilgan userni repo’larini sahifaga chiqarib bera olish
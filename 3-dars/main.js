document.querySelector('form').addEventListener('submit', async function(e) {
    try {
        e.preventDefault();

        let username = document.querySelector('input').value;
        let fetchUrl =  `https://api.github.com/users/${username}`;
        let repoUrl = `https://api.github.com/users/${username}/repos`

        let response = await fetch(fetchUrl);
        let repo = await fetch(repoUrl);
        let repository = await repo.json();
        
        repository.forEach(function(repo) {
            document.querySelector('ul').innerHTML += `<li>${repo.name}</li>`
        })

        if(!response.ok) {
            throw new Error('user not found')
        }

        let user = await response.json();
        document.querySelector('img').src = user.avatar_url;

       
       
    } catch(e) {
        console.log(e);
    };
});

// Github API bilan:
// - githubdan userlarni search qilish
// - repo’larni search qilish (malum bir user uchunmas umumiy githubdagi barcha repo’lar orasidan)
// - topilgan userni repo’larini sahifaga chiqarib bera olish

class Enemy{
    getEnemy = async() =>{
        const body = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')
            .then (res => res.json());
        return body;
    }

    start = async() => {
        const enemy = await this.getEnemy();
        return enemy;
    }
}



export default Enemy;
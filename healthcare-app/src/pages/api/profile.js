export default async function handler(req, res) {
    let user;
    user = await fetch('https://danana.solidcommunity.net/profile/card#me')
    console.log('RESPONSE' + JSON.stringify(user))

}
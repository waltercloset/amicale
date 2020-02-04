export const compareJMA = (prem=new Date(), deux=new Date(), aff=false) => {
    if(aff) console.log(prem,deux)

    if(aff) console.log(prem.getDate(),deux.getDate())
    return prem.getDate() === deux.getDate() && prem.getMonth()===deux.getMonth() && prem.getFullYear() === deux.getFullYear();
}
export const convertToId=(date=new Date()) => date.getDate()+'-'+date.getMonth()+'-'+date.getFullYear();
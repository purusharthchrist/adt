document.getElementById('formData').addEventListener('submit', retrieveJT)

async function retrieveJT(e) {
    e.preventDefault()
  
    let title = document.getElementById('title').value
  
    const response = await fetch(`http://localhost:5000/${title}`)
    const data = await response.json()
  
    // Create a list to store the output
    let outputList = []
  
    // Iterate over the records and add them to the list
    for (let record of data) {
      outputList.push(`
        <li class="list-group-item">
          <b>Job Title:</b> ${record["Job Title"]}<br>
          <b>Salary Estimate:</b> ${record["Salary Estimate"]}<br>
          <b>Job Description:</b> ${record["Job Description"]}<br>
          <b>Rating:</b> ${record["Rating"]}<br>
          <b>Company Name:</b> ${record["Company Name"]}<br>
          <b>Location:</b> ${record["Location"]}<br>
          <b>Size:</b> ${record["Size"]}<br>
          <b>Founded:</b> ${record["Founded"]}<br>
          <b>Type of ownership:</b> ${record["Type of ownership"]}<br>
          <b>Industry:</b> ${record["Industry"]}<br>
          <b>Sector:</b> ${record["Sector"]}<br>
          <b>Revenue:</b> ${record["Revenue"]}<br>
        </li>
      `)
    }
  
    // Set the innerHTML of the output element to the list
    document.getElementById('output').innerHTML = outputList.join('')
}  

// posting jobs
document.getElementById('postData').addEventListener('submit', postData)

function postData(e){
    e.preventDefault()

    let title = document.getElementById('posttitle').value
    let sal = document.getElementById('postsal').value
    let jd = document.getElementById('postjd').value
    let rat = document.getElementById('postrat').value
    let cname = document.getElementById('postcname').value
    let loc = document.getElementById('postloc').value
    let size = document.getElementById('postsize').value
    let founded = document.getElementById('postfounded').value
    let too = document.getElementById('posttoo').value
    let ind = document.getElementById('postind').value
    let sec = document.getElementById('postsec').value
    let rev = document.getElementById('postrev').value

    fetch('http://localhost:5000/postData',{
        method : 'POST',
        headers : {'Content-Type':'application/json'},
        body:JSON.stringify({
            'Job Title':title,
            'Salary Estimate':sal,
            'Job Description':jd,
            'Rating':rat,
            'Company Name':cname,
            'Location':loc,
            'Size':size,
            'Founded':founded,
            'Type of ownership':too,
            'Industry':ind,
            'Sector':sec,
            'Revenue':rev
        })
    })
    .then((response)=>response.json())
    .then((data)=>console.log(data))

}

//updating jobs
document.getElementById('updateData').addEventListener('submit', updateData)

async function updateData (e) {
    e.preventDefault();
  
    const oldtitle = await document.getElementById('oldtitle').value;
    const newtitle = await document.getElementById('newtitle').value;
    document.getElementById('output_update').innerHTML = `<p style="color:green">${oldtitle} has been replaced with ${newtitle}!</p>`
    const response = await fetch(`http://localhost:5000/updateData/${oldtitle}`,{
                                method : 'PUT',
                                headers : {'Content-Type':'application/json'},
                                body:JSON.stringify({
                                    "Job Title" : newtitle,
                                })
                            })
    const data = await response.json()
}

//deleting jobs
document.getElementById('deleteData').addEventListener('submit', deleteData)

async function deleteData (e) {
    e.preventDefault();

    const tobetitle = await document.getElementById('deltitle').value
    const tobecomp = await document.getElementById('delcomp').value
    document.getElementById('output_delete').innerHTML = `<p style="color:red">Jobs with title: ${tobetitle} from company: ${tobecomp} have been deleted!</p>`
    const response = await fetch(`http://localhost:5000/deleteData/${tobetitle}&${tobecomp}`,{
                                method: 'DELETE',
                                headers: {'Content-Type':'application/json'}
                            })
    const data = await response.json()

}
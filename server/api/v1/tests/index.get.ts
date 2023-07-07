// curl -H "Content-Type: application/x-www-form-urlencoded" -d "param1=value1&param2=value2"  -X POST 'localhost:3000/api/test' 
//  for file: -d @data.txt
// curl -H "Content-Type: application/json" -d '{"title": "generation", "email":"jlabrada@yahoo.com", "content":"Download Link"}' -X POST 'localhost:3000/api/v1/tests/email'
//  for file: -d @data.json

export default defineEventHandler(async (event) => {
    return { result: 'ok' }
})


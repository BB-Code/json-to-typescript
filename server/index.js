const express = require('express');
const cors = require('cors');
const { Configuration,OpenAIApi } = require('openai')
const app = express();
const PORT = 5000;
const config = new Configuration({
    basePath: '',  // 国内找代理的 openai 地址
    // organization: "org-2LWdF1GeR4VT3SzJvnloGnsm",
    apiKey: "" // 自己的 apiKey, openai 后台获取
});
const openai = new OpenAIApi(config);
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors());

app.get('/api',(req, res) => {
    res.json({
        method: 'api',
    });
});
app.post('/convert', async(req, res) => {
    let {value} = req.body;
    const prompt = `Convert the JSON object into Typescript interfaces \n ${value} Please, I need the only the code, I don't need any explanations.`;
    const completion = await  openai.createChatCompletion({
        model:'gpt-3.5-turbo',
        messages: [{ 
            "role": "user", 
            "content": prompt
        }]
    })
    
    res.json({
        message: "Successful",
        response: completion.data.choices[0].message.content
    })
})

app.listen(PORT, ()=>{
    console.log(`Server listening at http://localhost:${PORT}`);
})
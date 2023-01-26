import fastify from 'fastify'
import pg from 'pg'

const db = new pg.Client({
    host:'localhost',
    port:5432,
    user:'postgres',
    password:'senha',
})
await db.connect()
const app = fastify () 

app.get ('/task',async ()=>{

    
    return await db.query(`
            select ct.name as category,p.name as priority,tk.title,tk.description,tk.final_date from task tk
            join category ct on tk.category_id = ct.id
            join priority p on tk.priority_id = p.id;
        `)

    
})

app.get ('/task/:id',async (req,res)=>{

    
    return await db.query(`
            select ct.name as category,p.name as priority,tk.title,tk.description,tk.final_date from task tk
            join category ct on tk.category_id = ct.id
            join priority p on tk.priority_id = p.id where id = ${req.params.id};
        `)

    
})










app.post ('/task',async (req,res)=>{

    const { id, title, description, final_date, created_date, category_id, priority_id } = req.body
       
    return await db.query(`
            insert into task(
                id,
                title,
                description,
                final_date,
                created_date,
                category_id,
                priority_id)
            values(
                ${id},
                '${title}',
                '${description}',
                '${final_date}',
               '${created_date}',
                ${category_id},
                ${priority_id});
        `)

    })

app.get ('/country',async ()=>{

    
    return await db.query('select * from country;')

    
})

app.get ('/country/:id',async (req,res)=>{

    
    return await db.query(`select * from country where id = ${req.params.id};`)

    
})

app.delete ('/country/:id',async (req,res)=>{

    
    return await db.query(`delete from country where id = ${req.params.id};`)

    
})


app.post ('/country',async (req,res)=>{

    const { id, name } = req.body
       
    return await db.query(`
            insert into country(id,name) values(${id},'${name}');
        `)

    
})
app.get ('/state',async ()=>{

    
    return await db.query('select * from state;')

    
})

app.post ('/state',async (req,res)=>{

    const { id, name, short, country_id } = req.body
       
    return await db.query(`
            insert into state(id,name,short,country_id) values(${id},'${name}','${short}',${country_id});
        `)

    
})

app.get ('/credential',async ()=>{

    
    return await db.query('select * from credential;')

    
})

app.post ('/credential',async (req,res)=>{

    const { id, user_name, pass } = req.body
       
    return await db.query(`
            insert into credential(id,user_name,pass) values(${id},'${user_name}','${pass}');
        `)

    
})

app.get ('/contact',async ()=>{

    
    return await db.query('select * from contact;')

    
})

app.post ('/contact',async (req,res)=>{

        const { id, name, phone, neighborhood, address_id } = req.body
       
    return await db.query(`
            insert into contact(id,name,phone,neighborhood,address_id) values(${id},'${name}','${phone}','${neighborhood}',${address_id});
        `)

}) 

app.get ('/address',async ()=>{

    
    return await db.query('select * from address;')

    
})

app.post ('/address',async (req,res)=>{

    const { id, street, number, neighborhood, city_id, state_id, country_id } = req.body
   
return await db.query(`
        insert into address(id,street,number,neighborhood,city_id,state_id,country_id) values(${id},'${street}',${number},'${neighborhood}',${city_id},${state_id},${country_id});
    `)

}) 

app.get ('/city',async ()=>{

    
    return await db.query('select * from city;')

    
})

app.post ('/city',async (req,res)=>{

        const { id, name, state_id } = req.body
       
    return await db.query(`
            insert into city(id,name,state_id) values(${id},'${name}',${state_id});
        `)

}) 

app.get ('/category',async ()=>{

    
    return await db.query('select * from category;')

    
})

app.post ('/category',async (req,res)=>{

    const { id, name } = req.body
   
return await db.query(`
        insert into category(id,name) values(${id},'${name}');
    `)

}) 

app.get ('/priority',async ()=>{

    
    return await db.query('select * from priority;')

    
})

app.post ('/priority',async (req,res)=>{

    const { id, name } = req.body
   
return await db.query(`
        insert into priority(id,name) values(${id},'${name}');
    `)

}) 

app.get ('/user_record',async ()=>{

    
    return await db.query('select * from user_record;')

    
})

app.post ('/user_record',async (req,res)=>{

    const { id, contact_id, credential_id  } = req.body
   
return await db.query(`
        insert into user_record(id,contact_id,credential_id ) values(${id},${contact_id},${credential_id});
    `)

}) 

app.listen ({
        port : 3333
    }).then (()=>{

        console.log('internacional de porto alegre')

    })


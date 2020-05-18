import express, { Request, Response } from 'express';
import morgan from 'morgan';
import _omit from 'lodash/omit';

let data: any = {
    "1": "math",
    "2": "english",
    "3": "chinese",
    "4": "data strcture"
}

// create a server instance
const app = express();
app.use(morgan('tiny'));
app.use(express.json());

// create, read, update, delete: CRUD
// Show Operation: 单数
app.get('/api/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    const result = data[id] ? data[id] : "Not found";
    const status = data[id] ? 200 : 404;
    res.status(status).send(result);
});

// Read Operation 复数
app.get('/api', (req: Request, res: Response) => {
    res.status(200).send(data)
})

// Create Operation
app.post('/api', (req: Request, res:Response) => {
    const bodyData = req.body
    data = {...data, ...bodyData}
    res.status(200).send(data)
})

// Update operation
app.patch('/api/:id', (req: Request, res: Response) => {
    const id = req.params.id
    const update = req.body.update;
    data[id] = update;
    res.status(200).send(data);
})

// Delete Opeartion
app.delete('/api/:id', (req: Request, res: Response) => {
    const id = req.params.id;
    data = _omit(data,id)
    res.status(200).send(data);
})


// start the server at port 3000
app.listen(3000, () => {
  console.log('Server starts at port http://localhost:3000 ...');
});

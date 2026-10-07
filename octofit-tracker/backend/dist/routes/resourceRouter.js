import { Router } from 'express';
function isObjectBody(body) {
    return typeof body === 'object' && body !== null && !Array.isArray(body);
}
function editableFields(body) {
    const { _id, id, __v, createdAt, updatedAt, ...fields } = body;
    return Object.fromEntries(Object.entries(fields).filter(([key]) => !key.startsWith('$') && !key.includes('.')));
}
function requireBody(request) {
    if (!isObjectBody(request.body)) {
        const error = new Error('Request body must be a JSON object');
        Object.assign(error, { status: 400 });
        throw error;
    }
    return editableFields(request.body);
}
export function createResourceRouter(resource, sort = { createdAt: -1 }) {
    const router = Router();
    router.get('/', async (_request, response) => {
        const records = await resource.find().sort(sort).lean();
        response.json(records);
    });
    router.get('/:id', async (request, response) => {
        const record = await resource.findById(request.params.id).lean();
        if (!record) {
            response.status(404).json({ error: 'Record not found' });
            return;
        }
        response.json(record);
    });
    router.post('/', async (request, response) => {
        const record = await resource.create(requireBody(request));
        response.status(201).json(record);
    });
    router.patch('/:id', async (request, response) => {
        const fields = requireBody(request);
        const record = await resource
            .findByIdAndUpdate(request.params.id, fields, {
            new: true,
            runValidators: true,
        })
            .lean();
        if (!record) {
            response.status(404).json({ error: 'Record not found' });
            return;
        }
        response.json(record);
    });
    router.delete('/:id', async (request, response) => {
        const record = await resource.findByIdAndDelete(request.params.id);
        if (!record) {
            response.status(404).json({ error: 'Record not found' });
            return;
        }
        response.status(204).end();
    });
    return router;
}

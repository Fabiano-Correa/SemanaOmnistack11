const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1 } = request.query; //esquema de paginação

        const [count] = await connection('incidents').count(); // query a parte para trazer o total de registros na tabela
        
        const incidents = await connection('incidents')
        .join('ongs', 'ong_id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5 ) //esquema de paginação
        .select(['incidents.*', 
        'ongs.name', 
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']); //passando o resultado da query para o cabeçalho de resposta

        return response.json(incidents);
    },

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({ id });
    },

    async delete(request, response){
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();
       
        if(incident.ong_id != ong_id){
            return response.status(401).json({ error: 'Operação não permitida.' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
};
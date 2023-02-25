import api from './api';


export default{
    listar:() =>{
        return api.get('pacientes');
    },
    salvar:(paciente) =>{
        return api.post('pacientes',paciente)
    },
    editar:(paciente) =>{
        return api.put('paciente/'+paciente.id,paciente)
    },
    apagar:(paciente) =>{
        return api.delete('paciente/'+paciente.id)
    } 
}
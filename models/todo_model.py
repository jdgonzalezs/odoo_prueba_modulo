# -*- coding: utf-8 -*-
from odoo import models, fields, api
from datetime import datetime

class TodoTask(models.Model):
    _name = 'todo.task'
    _description = 'To-do Task'

    name = fields.Char('Description', required=True)
    is_done = fields.Boolean('Done?')
    active = fields.Boolean('Active?', default=True)
    # A esta fecha se le restan 5 horas para que concoincida con la hora de Colombia
    fecha = fields.Datetime(default=fields.Datetime.now) 
    promesa = fields.Float() 
    mdh_selection = fields.Selection([
        ('minutos', 'Minutos'), 
        ('horas','Horas'),
        ('dias' ,'Días')], default='minutos')  

    # Para el widget gauge 
    progress_rate = fields.Integer(string='Progreso', store=True, compute='write_progress_bar')
    maximum_rate = fields.Integer(string='Maximum Rate', default=100)

    @api.multi
    def do_toggle_done(self):
        for task in self:
            task.is_done = not task.is_done
        return True
    
    @api.multi
    def do_clear_done(self):
        dones = self.search([('is_done', '=', True)], limit=1)
        dones.write({'active': False})
        return True 

    @api.model
    def get_all_data(self):
        result = {}
        datas = self.env['todo.task'].search([], order='create_date desc', limit=1)
        for d in datas:
            #result['id'] = d.id
            result['numero_promesa'] = d.promesa
            result['fecha_creacion'] = d.fecha
            result['seleccion'] = d.mdh_selection
            result['progress'] = d.progress_rate
 
        return result


    def write(self,values):
        #values = {}
        #values['progress_rate'] = self.progress_rate 
        #campo = super(TodoTask, self).write(values)
        # for prog in self:
        #     prog['progress_rate'] = values
        print("Probando sobreescritura de Write")
        # rec.write({'state': 'done'})
        #return campo

        return super(TodoTask, self).write(values)

    @api.one
    def write_progress_rate(self, val):
        #self.ensure_one()
        val['progress_rate'] = self.progress_rate
        return super(TodoTask, self).write(val)

    # @api.model
    # def create(self, vals):
    #     res = super(bk_backend, self).create(vals)
    #     self.env['account.analytic.line'].search([('backend_id', '=', False)]).write({'backend_id': res.id})
    #     return res



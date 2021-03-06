# -*- coding: utf-8 -*-
{
    'name': "prueba_modulo",

    'summary': """
        Short (1 phrase/line) summary of the module's purpose, used as
        subtitle on modules listing or apps.openerp.com""",

    'description': "Otro módulo de prueba",

    'author': "My Company",
    'website': "http://www.yourcompany.com",

    # Categories can be used to filter modules in modules listing
    # Check https://github.com/odoo/odoo/blob/11.0/odoo/addons/base/module/module_data.xml
    # for the full list
    'category': 'Uncategorized',
    'version': '0.1',

    # any module necessary for this one to work correctly
    'depends': ['base','web_kanban_gauge'],

    # always loaded
    'data': [
        'security/ir.model.access.csv',
        'views/views.xml',
        'views/templates.xml',
        #'views/todo_menu.xml',
        'views/todo_view.xml',
        'views/task_view.xml',
    ],
    # only loaded in demonstration mode
    'demo': [
        'demo/demo.xml',
    ],

    'js': [
        'static/src/js/diferencia.js',
        'static/src/js/escribir.js',
        'static/src/js/enviar_dato.js',
    ],
} #agregar archivos de lib en este manifiesto
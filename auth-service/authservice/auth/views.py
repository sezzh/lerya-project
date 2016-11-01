from flask import Blueprint, request, jsonify
from flask_restful import Resource, Api, reqparse
from authservice.auth.auth_user import auth_superuser
from marshmallow import ValidationError


tokens = Blueprint('tokens', __name__)

api = Api(tokens)

parser = reqparse.RequestParser()

parser.add_argument('type', required=False, type=str,
                    help="el atributo [type] no puede estar vacío!")

parser.add_argument('sub', required=True, type=str,
                    help="el atributo [sub] no puede estar vacío!")

parser.add_argument('password', required=True, type=str,
                    help="El atributo [password] no puede estar vacío!"
                    )

parser.add_argument('exp', required=False, type=int)


class Tokens(Resource):
    def post(self):
        if request.content_type != "application/json":
            resp = jsonify({"error": "¡ Petición solicitada no soportada! :("})
            resp.status_code = 405
            return resp
        else:
            args = parser.parse_args()
            p_type = args.type if args.type is not None else "user"
            try:
                if p_type == "superuser":
                    return auth_superuser(args.sub, args.password, args.exp)
                else:
                    return jsonify({"aviso": "token no soportado aún :("})

            except ValidationError as err:
                resp = jsonify({"error": err.messages})
                resp.status_code = 400
                return resp


api.add_resource(Tokens, '')

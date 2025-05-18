from flask import Flask, request, render_template, redirect, url_for, jsonify
import database.db as db
from werkzeug.utils import secure_filename
import os
from datetime import datetime
from math import ceil
from sqlalchemy import func

UPLOAD_FOLDER = "static/uploads"

app = Flask(__name__)

app.secret_key = "s3cr3t_k3y"
app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

# Rutas
@app.route("/", methods=["GET"])
def index():
    session = db.SessionLocal()
    actividades = session.query(db.Actividad).order_by(db.Actividad.dia_hora_inicio.desc()).limit(5).all()
    output = render_template("index.html", actividades=actividades)
    session.close()
    return output


@app.route("/actividad/nueva", methods=["GET","POST"])
def nueva_actividad():
    if request.method == "POST":
        data = {
            "comuna_id": request.form.get("select-comuna"),
            "sector": request.form.get("sector"),
            "nombre": request.form.get("nombre"),
            "email": request.form.get("email"),
            "celular": request.form.get("phone"),
            "dia_hora_inicio": datetime.strptime(request.form.get("tiempo-inicio"), "%Y-%m-%dT%H:%M"),
            "dia_hora_termino": datetime.strptime(request.form.get("tiempo-termino"), "%Y-%m-%dT%H:%M"),
            "descripcion": request.form.get("descripcion")
        }
        nueva = db.create_actividad(data)
        metodo = request.form.get("select-forma-contacto")
        identificador = request.form.get("url-contacto")
        if metodo and identificador:
            db.add_contacto(nueva.id, metodo, identificador)
        tema = request.form.get("select-tema")
        if tema:
            glosa = request.form.get("otro-tema") if tema == "Otro" else None
            db.add_tema(nueva.id, tema, glosa)
        for i in range(1, 6):
            file = request.files.get(f"foto{i}")
            if file and file.filename:
                filename = secure_filename(file.filename)
                filepath = os.path.join(app.config["UPLOAD_FOLDER"], filename)
                file.save(filepath)
                db.add_foto(nueva.id, filepath, filename)
        return redirect(url_for("index"))
    return render_template("agregar-actividad.html")

@app.route("/actividades", methods=["GET"])
def listado_actividades():
    page = request.args.get("page", 1, type=int)
    per_page = 5

    session = db.SessionLocal()
    total = session.query(func.count(db.Actividad.id)).scalar()
    actividades = (
        session.query(db.Actividad)
                .order_by(db.Actividad.dia_hora_inicio.desc())
                .offset((page-1)*per_page)
                .limit(per_page)
                .all()
    )

    total_pages = ceil(total/per_page)
    has_prev = page > 1
    has_next = page < total_pages

    response = render_template(
        "ver-listado.html",
        actividades=actividades,
        page=page,
        total_pages=total_pages,
        has_prev=has_prev,
        has_next=has_next
    )
    session.close()
    return response


@app.route("/actividades/<int:actividad_id>", methods=["GET"])
def detalle_actividad(actividad_id):
    actividad = db.get_actividad_by_id(actividad_id)
    if not actividad:
        return redirect(url_for("listado_actividades"))
    return render_template("detalle.html", actividad=actividad)

@app.route("/estadisticas", methods=["GET"])
def estadisticas():
    return render_template("estadisticas.html")

@app.route("/api/regions", methods=["GET"])
def api_regions():
    session = db.SessionLocal()
    regiones = session.query(db.Region).order_by(db.Region.nombre).all()
    session.close()
    return jsonify([{"id": r.id, "nombre": r.nombre} for r in regiones])

@app.route("/api/comunas", methods=["GET"])
def api_comunas():
    region_id = request.args.get("region_id", type=int)
    session = db.SessionLocal()
    comunas = session.query(db.Comuna).filter(db.Comuna.region_id==region_id).order_by(db.Comuna.nombre).all()
    session.close()
    return jsonify([{"id": c.id, "nombre": c.nombre} for c in comunas])

if __name__ == "__main__":
    app.run(debug=True)
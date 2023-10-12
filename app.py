from flask import *
from flask_pymongo import PyMongo
from flask_cors import CORS, cross_origin

app = Flask(__name__)
cors = CORS(app)

app.config['MONGO_URI'] = 'mongodb://localhost:27017/adt_final'
app.config['CORS_Headers'] = 'Content-Type'

mongo = PyMongo(app)

@app.route('/', methods=['GET'])
def retrieveAll():
    data = []
    coll = mongo.db.adt_final
    for _ in coll.find():
        data.append({"Job Title": _["Job Title"],
                    "Salary Estimate": _["Salary Estimate"],
                    "Job Description": _["Job Description"],
                    "Rating": _["Rating"],
                    "Company Name": _["Company Name"],
                    "Location": _["Location"],
                    "Size": _["Size"],
                    "Founded": _["Founded"],
                    "Type of ownership": _["Type of ownership"],
                    "Industry": _["Industry"],
                    "Sector": _["Sector"],
                    "Revenue": _["Revenue"]
                    })
    return jsonify(data)

@app.route('/<title>', methods=['GET'])
@cross_origin()
def retrieveFromTitle(title):
    coll = mongo.db.adt_final
    data = coll.find({"Job Title": title})
    val = []
    for _ in data:
        val.append({"Job Title": _["Job Title"],
                    "Salary Estimate": _["Salary Estimate"],
                    "Job Description": _["Job Description"],
                    "Rating": _["Rating"],
                    "Company Name": _["Company Name"],
                    "Location": _["Location"],
                    "Size": _["Size"],
                    "Founded": _["Founded"],
                    "Type of ownership": _["Type of ownership"],
                    "Industry": _["Industry"],
                    "Sector": _["Sector"],
                    "Revenue": _["Revenue"]
                    })
    return jsonify(val)

@app.route('/postData', methods=['POST'])
def postData():
    coll = mongo.db.adt_final
    title = request.json['Job Title']
    sal = request.json['Salary Estimate']
    jd = request.json['Job Description']
    rat = request.json['Rating']
    c_name = request.json['Company Name']
    loc = request.json['Location']
    size = request.json['Size']
    founded = request.json['Founded']
    type_of_ow = request.json['Type of ownership']
    ind = request.json['Industry']
    sec = request.json['Sector']
    rev = request.json['Revenue']
    coll.insert_one({"Job Title": title,
                    "Salary Estimate": sal,
                    "Job Description": jd,
                    "Rating": rat,
                    "Company Name":  c_name,
                    "Location": loc,
                    "Size": size,
                    "Founded": founded,
                    "Type of ownership": type_of_ow,
                    "Industry": ind,
                    "Sector": sec,
                    "Revenue": rev
                    })
    return jsonify({"Job Title": title,
                    "Salary Estimate": sal,
                    "Job Description": jd,
                    "Rating": rat,
                    "Company Name":  c_name,
                    "Location": loc,
                    "Size": size,
                    "Founded": founded,
                    "Type of ownership": type_of_ow,
                    "Industry": ind,
                    "Sector": sec,
                    "Revenue": rev
                    })

@app.route('/deleteData/<jt>&<c_name>', methods = ['DELETE'])
def deleteData(jt, c_name):
    coll = mongo.db.adt_final
    coll.delete_many({"Job Title":jt, "Company Name":c_name})
    return redirect(url_for('retrieveAll'))

@app.route('/updateData/<title>', methods=['PUT'])
def updateData(title):
    coll = mongo.db.adt_final
    new_title = request.json['Job Title']
    coll.update_many({"Job Title":title}, {"$set":{'Job Title' : new_title}})
    return redirect(url_for('retrieveAll'))

if __name__ == '__main__':
    app.run(debug=True)
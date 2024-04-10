const calculate_range = (crimes) => {
  if (!crimes || typeof crimes != "string") return console.warn("Error en 'calculate_range'", crimes);
  
  let string = crimes
  let string_min = string.toLowerCase();

  //Obtener palabras clave
  let word = ""
  let words = []
  for (let i = 0; i < string_min.length; i++) {
    if(i === string_min.length - 1){
      word += string_min[i]
      words.push(word)
      word = ""
    }else if(string_min[i] === " "){
      words.push(word)
      word = ""
    }else if(string_min[i] !== "," && string_min[i] !== ";"){
      word += string_min[i]
    }
  }

  //Comparar palabras en los rangos
  let points = []
  for (let j = 0; j < words.length; j++) {
    if(words[j] === "terrorismo" || words[j] === "terrorista" || words[j] === "terroristas"){
      points.push(100)
    }else if(words[j] === "asesinato" || words[j] === "asesino" || words[j] === "homicidio" || words[j] === "feminicidio" || words[j] === "asesinar"){
      points.push(90)
    }else if(words[j] === "violación" || words[j] === "violacion" || words[j] === "abuso" || words[j] === "sexual"){
      points.push(80)
    }else if(words[j] === "secuestro"){
      points.push(70)
    }else if(words[j] === "violencia" || words[j] === "amenazas" || words[j] === "lesiones"){
      points.push(60)
    }else if(words[j] === "robo" || words[j] === "robos" || words[j] === "rapiña" || words[j] === "estafa" || words[j] === "estafas"){
      points.push(50)
    }else if(words[j] === "estupefacientes" || words[j] === "sustancias" || words[j] === "tráfico" || words[j] === "trafico" || words[j] === "drogas"){
      points.push(40)
    }else if(words[j] === "conspiración" || words[j] === "conspiracion" || words[j] === "fraude" || words[j] === "fraudes" || words[j] === "extorsión" || words[j] === "extorsion" || words[j] === "traición" || words[j] === "traicion" || words[j] === "corrupción" || words[j] === "corrupcion"){
      points.push(30)
    }else if(words[j] === "armas"){
      points.push(20)
    }
  }

  let range = 10;
  //console.log(points)
  if(points.length === 0){
    range = 10
  }else if(points.length === 1){
    range = points[0]
  }else if(points.length >= 2){
    let max = Math.max(...points);
    let min = Math.min(...points);
    if(max !== min){
      range = max - min;
    }else{
      range = max
    }
  }
  range += "%"
  return range
}

export default calculate_range;
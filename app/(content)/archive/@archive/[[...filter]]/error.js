/*
  cette page nous permet la gestion des erreurs qui peuvent survenir lors de la navigation sur les pages de '@archive/[[...filter]]'
*/

'use client'; // on utilise le mode client seulement.  car ces erreurs surviedornt lors de la navigation sur le client

export default function FilterError({error}) {
  return (
    <div id="error">
      <h2>Oops! Something went wrong!</h2>
      <p>{error.message}</p>  
    </div>
  );
}
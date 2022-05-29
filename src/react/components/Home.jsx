import React, { useEffect, useState } from "react";

function Home({ admin, setIsLogged, setIsAdmin }) {
  useEffect(() => {
    fetch("api/check")
      .then((res) => {
        //console.log("log de res", res);
        if (res.status === 202) {
          console.log("enter in status 202");
          setIsAdmin(true);
          setIsLogged(true);
          //refreshMenu();
          //navigate("/events");
        } else if (res.status === 200) {
          console.log("enter in status 200");
          setIsLogged(true);

          //refreshMenu();
          setIsAdmin(false);
          console.log("is admin", admin);
          //navigate("/events");
        } else {
          throw new Error("error");
        }
      })
      .catch((e) => {
        console.log("No user connected");
      });
  }, []);
  console.log("is admin", admin);
  if (admin) {
    return  <div className='text-center'> 
    <br/>
    <h4>En tant qu'admin, vous pouvez :</h4> 
    <br/>
        <d>
        - Voir la listes des personnes avec leur statut, et si elles sont connectées, vous pouvez les déconnecter.
        </d>
        <br/><br/>
        <d>
        - Ajouter des évènements et des manches d'évènements, et vous pouvez supprimer un évènement
        </d>
        <br/><br/>
        <d>
        - Vous pouvez inscrire un autre user à une manche d'évènement
        </d>
        <br/><br/>
        <d>
         - Vous pouvez vous déconnecter
        </d>
        </div>
        
  }
   
   else
  {
    return <div className='text-center'>
      <br/>
      <h4>En tant qu'utilisateur non-connecté, vous pouvez : </h4>
      <br/>
        <d>
        - Créer un compte user
        </d>
        <br/><br/>
        <d>
        - Vous connecter
        </d>
        <br/><br/>
        <d>
        - Consulter les évènements
        </d>
        <br/><br/>
        <h4>En tant qu'utilisateur connecté, vous pouvez :</h4> 
    <br/>
        <d>
        - Vous inscrire à des manches d'évènements
        </d>
        <br/><br/>
        <d>
          - Vous pouvez voir vos inscriptions
        </d>
        <br/><br/>
        <d>
          - Vous pouvez vous déconnecter
        </d>
        
      </div>;
  }
}

export default Home;

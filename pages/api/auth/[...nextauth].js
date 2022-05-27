import NextAuth from 'next-auth'
import Auth0Provider from "next-auth/providers/";


export default NextAuth({
  providers: [
    Auth0Provider({
        clientId: 'AUfAmM7EovrfonUTV2S1cFt4pCiXAU-Knv7LDn539Lh9vJvExSY-SPIGVFTlSHQw9cA2b6lnmoMa1pno',
        clientSecret: 'ECGtpi4Xc0l6LhEWt8OZLsLGP72fTTs6CbitAEbmDLfvLuJwbitzEVp7n23-uEs2WGchnl9DMthse2_w',
    })
  ]
})
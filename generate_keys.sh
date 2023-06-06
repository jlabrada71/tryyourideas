#gen rsa
openssl genrsa -des3 -out private.pem 2048
openssl rsa -in private.pem -outform PEM -pubout -out public.pem

#gen ec
openssl ecparam -genkey -name secp521r1 -noout -out es512-private.pem
openssl ec -in es512-private.pem -pubout -out es512-public.pem

# these are the best keys
# If you use jose node library, you will also get access to 
# Edwards-curve Digital Signature Algorithm (EdDSA) encryption 
# algorithm, which is the ultimate best option for 
# JWT implementation. It uses SHA-512 and Curve 25519 to give 
# the Ed25519 method.
# EdDSA, as you can guess, is an asymmetric algorithm that uses 
# public and private keys so its use is the same as with RSA or 
# ECDSA. EdDSA has better performance and even shorter keys 
# than ECDSA while providing better security.

# private key
openssl genpkey -algorithm ed25519 -out eddsa-private.pem
# public key
openssl pkey -in eddsa-private.pem -pubout -out eddsa-public.pem




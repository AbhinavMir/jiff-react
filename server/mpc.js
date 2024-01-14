// mpc.js
module.exports = {
    /**
     * The server-side MPC computation.
     * @param {Array<number>} inputs - The inputs from all parties.
     * @param {object} jiffInstance - The JIFF server instance.
     * @param {string} computationId - A unique identifier for the computation.
     * @returns {Promise<number>} - A promise that resolves to the sum.
     */
    compute: async function (inputs, jiffInstance, computationId) {
      return new Promise((resolve, reject) => {
        // Check if inputs are valid
        if (!inputs || !Array.isArray(inputs) || inputs.some(isNaN)) {
          reject(new Error('Invalid inputs'));
          return;
        }
  
        try {
          // Share inputs and compute sum
          let sumShare = null;
          inputs.forEach((input, index) => {
            const share = jiffInstance.share(input, null, null, computationId)[index + 1];
            sumShare = sumShare ? sumShare.sadd(share) : share;
          });
  
          // Open the sum and resolve the promise
          jiffInstance.open(sumShare).then(result => {
            resolve(result);
          }).catch(reject);
        } catch (error) {
          reject(error);
        }
      });
    }
  };
  
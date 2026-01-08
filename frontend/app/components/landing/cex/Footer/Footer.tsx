const Footer = () => {
  return (
    <div className="bg-white py-20">
      <div className="w-1/2 mx-auto rounded-2xl grid grid-cols-7 text-gray-400 gap-6 bg-[#f7f6f6] px-12 pt-12 pb-24 ">
        <div className="flex flex-col gap-6 mr-24 col-span-4">
          <h3 className="text-base">aave</h3>
          <p className="text-xs ">
            Aave.com provides information and resources about the fundamentals
            of the decentralised non-custodial liquidity protocol called the
            Aave Protocol, comprised of open-source self-executing smart
            contracts that are deployed on various permissionless public
            blockchains, such as Ethereum (the "Aave Protocol" or the
            "Protocol"). Aave Labs does not control or operate any version of
            the Aave Protocol on any blockchain network.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-black">Resources</h3>
          <p className="text-sm">Blog</p>
          <p className="text-sm">Brand</p>
          <p className="text-sm">FAQ</p>
          <p className="text-sm">Case Studies</p>
          <p className="text-sm">Help & Support</p>
          <p className="text-sm">Governance</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-black">Developers</h3>
          <p className="text-sm">Build</p>
          <p className="text-sm">Documentation</p>
          <p className="text-sm">Technical Paper</p>
          <p className="text-sm">Security</p>
          <p className="text-sm">Bug Bounty</p>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="text-sm text-black">Company</h3>
          <p className="text-sm">Privacy Policy</p>
          <p className="text-sm">Terms of Use</p>
          <p className="text-sm">Contact</p>
          <p className="text-sm">Manage Analytics</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;

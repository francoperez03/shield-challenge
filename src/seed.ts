// src/seeds/seed.ts
import { Chain } from 'entities/Chain';
import { AppDataSource } from 'config/data-source';
import { User } from 'entities/User';
import { Wallet } from 'entities/Wallet';
import { hashPassword } from 'utils/hash';

async function seed() {
  await AppDataSource.initialize();
  
  const userRepository = AppDataSource.getRepository(User);
  const chainRepository = AppDataSource.getRepository(Chain);
  const walletRepository = AppDataSource.getRepository(Wallet);

  // Seed para la tabla Chain
  const chains = [
    { name: 'Ethereum', chainId:"1", network: 'mainnet', rpcUrl: 'https://mainnet.infura.io/v3/YOUR-PROJECT-ID', explorerUrl: 'https://etherscan.io' },
    { name: 'Polygon', chainId:"137", network: 'mainnet', rpcUrl: 'https://polygon-rpc.com', explorerUrl: 'https://polygonscan.com' },
    { name: 'Binance Smart Chain', chainId:"56", network: 'mainnet', rpcUrl: 'https://bsc-dataseed.binance.org', explorerUrl: 'https://bscscan.com' },
  ];

  for (const chainData of chains) {
    const existingChain = await chainRepository.findOneBy({ name: chainData.name });
    if (!existingChain) {
      const chain = chainRepository.create(chainData);
      await chainRepository.save(chain);
    }
  }

  // Seed para la tabla User
  const users = [
    { email: 'user1@example.com', password: await hashPassword('password123') },
    { email: 'user2@example.com', password: await hashPassword('password456') },
  ];

  for (const userData of users) {
    const existingUser = await userRepository.findOneBy({ email: userData.email });
    if (!existingUser) {
      const user = userRepository.create(userData);
      await userRepository.save(user);
    }
  }

  // Seed para la tabla Wallet
  const user1 = await userRepository.findOneBy({ email: 'user1@example.com' });
  const user2 = await userRepository.findOneBy({ email: 'user2@example.com' });

  const ethereumChain = await chainRepository.findOneBy({ name: 'Ethereum' });
  const polygonChain = await chainRepository.findOneBy({ name: 'Polygon' });

  if (user1 && ethereumChain) {
    const wallet1 = walletRepository.create({
      tag: 'Main Wallet',
      address: '0x1234567890abcdef1234567890abcdef12345678',
      user: user1,
      chain: ethereumChain,
    });
    await walletRepository.save(wallet1);
  }

  if (user2 && polygonChain) {
    const wallet2 = walletRepository.create({
      tag: 'Savings Wallet',
      address: '0x1234567890abcdef1234567890abcdef12345670',
      user: user2,
      chain: polygonChain,
    });
    await walletRepository.save(wallet2);
  }

  console.log('Seeding completed successfully.');
  await AppDataSource.destroy();
}

seed().catch((error) => {
  console.error('Error seeding data:', error);
});

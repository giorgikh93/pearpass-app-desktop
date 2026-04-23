<p align="center">
  <img src="assets/images/logo.png" alt="Pearpass logo" width="264"/>
</p>

# PearPass Desktop

> A distributed, end-to-end encrypted password manager for desktop, built on Pear Runtime, works offline, syncs across devices.

---

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Installation](#installation)
- [Usage Examples](#usage-examples)
- [Testing](#testing)
- [Staging to Dev](#staging-to-dev)
- [Workspace Dependencies](#workspace-dependencies)
- [Dependencies](#dependencies)
- [Related Projects](#related-projects)
- [Contributing](#contributing)
- [License](#license)

---

## Introduction

PearPass is an open-source, privacy-first password and identity manager that gives you full control over your sensitive information. It makes storing and managing your credentials simple, secure, and private, with all data encrypted and stored locally on your device.

Unlike traditional password managers that rely on centralized servers, PearPass is built on [Pear Runtime](https://pears.com/) and uses peer-to-peer technology to sync your credentials directly between your devices, ensuring they remain private, secure, and always under your control.

---

## Features

- **Encrypted-at-rest storage.** Passwords, credit cards, secure notes, and custom fields, all encrypted before hitting disk.
- **Cross-device sync.** Peer-to-peer replication via Pear Runtime; no central server required.
- **Offline access.** Your vault is always available locally, even without a network connection.
- **Password health.** Built-in strength analysis flags weak or reused passwords.
- **Random password generator.** Configurable generator produces strong, unique passwords on demand.
- **Multi-platform.** Runs on macOS, Linux, and Windows via Electron; also available as a native Pear app.
- **Browser extension integration.** Works alongside the [PearPass browser extension](https://github.com/tetherto/pearpass-app-browser-extension) for autofill.

---

## Installation

### Prerequisites

- **Node.js 22.12.0** — check the required version in `.nvmrc` and verify with:

```bash
node --version
```

- **Pear Runtime** — install guide: [docs.pears.com/guide/getting-started](https://docs.pears.com/guide/getting-started.html).

### Steps

```bash
# 1. Clone the repository
git clone git@github.com:tetherto/pearpass-app-desktop.git
cd pearpass-app-desktop

# 2. Install dependencies
npm install

# 3. Build translation keys
npm run build

# 4. Start the development app
npm run dev
```

---

## Usage Examples

Visit the official PearPass documentation for step-by-step guides on setup, vault management, syncing across devices, and browser extension usage:

**[docs.pass.pears.com](https://docs.pass.pears.com)**

---

## Testing

### Unit Testing

Run unit tests with Jest:

```bash
npm test
```

Run the linter:

```bash
npm run lint
```

---

## Staging to Dev

Ensure the app runs correctly using `npm run dev`.

If successful, stage it, for example: `pear stage dev`.

Then run the app: `pear run pear://GENERATED_URL`.

Pear serves files from the `dist/` folder. The `src/` folder is for development only and is excluded from the Pear bundle via `package.json`:

```json
"ignore": [".github", "appling", ".git", ".gitignore", "packages", "src"]
```

---

## Workspace Dependencies

The following sibling modules must be present in the workspace (they are not declared as npm dependencies):

- [`@tetherto/tether-dev-docs`](../tether-dev-docs)
- [`@tetherto/pear-apps-lib-feedback`](../pear-apps-lib-feedback)
- [`@tetherto/pear-apps-lib-ui-react-hooks`](../pear-apps-lib-ui-react-hooks)
- [`@tetherto/pear-apps-utils-avatar-initials`](../pear-apps-utils-avatar-initials)
- [`@tetherto/pear-apps-utils-date`](../pear-apps-utils-date)
- [`@tetherto/pear-apps-utils-generate-unique-id`](../pear-apps-utils-generate-unique-id)
- [`@tetherto/pear-apps-utils-pattern-search`](../pear-apps-utils-pattern-search)
- [`@tetherto/pear-apps-utils-qr`](../pear-apps-utils-qr)
- [`@tetherto/pear-apps-utils-validator`](../pear-apps-utils-validator)
- [`@tetherto/pearpass-lib-constants`](../pearpass-lib-constants)
- [`@tetherto/pearpass-lib-data-export`](../pearpass-lib-data-export)
- [`@tetherto/pearpass-lib-data-import`](../pearpass-lib-data-import)
- [`@tetherto/pearpass-lib-ui-theme-provider`](../pearpass-lib-ui-theme-provider)
- [`@tetherto/pearpass-lib-vault`](../pearpass-lib-vault)
- [`@tetherto/pearpass-lib-vault-core`](../pearpass-lib-vault-core)
- [`@tetherto/pearpass-utils-password-check`](../pearpass-utils-password-check)
- [`@tetherto/pearpass-utils-password-generator`](../pearpass-utils-password-generator)

---

## Dependencies

- [Pear Runtime](https://pears.com/)
- [React](https://reactjs.org/)
- [Styled Components](https://styled-components.com/)
- [Lingui](https://lingui.dev/)
- [Redux](https://redux.js.org/)

---

## Related Projects

| Project                                                                                                          | Description                                |
| ---------------------------------------------------------------------------------------------------------------- | ------------------------------------------ |
| [`pearpass-app-mobile`](https://github.com/tetherto/pearpass-app-mobile)                                         | Mobile app for PearPass                    |
| [`pearpass-app-browser-extension`](https://github.com/tetherto/pearpass-app-browser-extension)                   | Browser extension for PearPass             |
| [`pearpass-lib-vault`](https://github.com/tetherto/pearpass-lib-vault)                                           | Vault management library                   |
| [`pearpass-lib-vault-core`](https://github.com/tetherto/pearpass-lib-vault-core)                                 | Bare worker and client for PearPass vaults |
| [`pearpass-lib-ui-react-components`](https://github.com/tetherto/pearpass-lib-ui-react-components)               | React UI component library                 |
| [`pearpass-lib-ui-react-native-components`](https://github.com/tetherto/pearpass-lib-ui-react-native-components) | React Native UI component library          |
| [`tether-dev-docs`](https://github.com/tetherto/tether-dev-docs)                                                 | Developer documentation and guides         |

---

## Contributing

Contributions are welcome. See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for the dev loop, coding conventions, and how to run the test suite.

---

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](./LICENSE) file for details.
